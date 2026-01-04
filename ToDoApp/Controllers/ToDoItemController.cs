using ToDoApp.Interfaces;
using Models;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Services;

namespace ToDoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoItemController : ControllerBase
    {
        private readonly IToDoServices _toDoServices;

        public ToDoItemController(IToDoServices toDoServices)
        {
            _toDoServices = toDoServices;
        }

       
        [HttpPost]
        public IActionResult CreateToDoItem([FromBody] ToDoItem item)
        {
            var createdItem = _toDoServices.AddToDoItem(item);
            return CreatedAtAction(nameof(GetToDoItemById), new { id = createdItem.Id }, createdItem);
        }

        [HttpGet("{id}")]
        public IActionResult GetToDoItemById(int id)
        {
            var item = _toDoServices.GetToDoItemById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet]
        public IActionResult GetAllToDoItems()
        {
            var items = _toDoServices.GetAllToDoItems();
            return Ok(items);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateToDoItem(int id, [FromBody] ToDoItem item)
        {
            var existingItem = _toDoServices.GetToDoItemById(id);
            if (existingItem == null)
            {
                return NotFound();
            }
            _toDoServices.UpdateToDoItem(item);
            
            // Get the updated item and return it
            var updatedItem = _toDoServices.GetToDoItemById(id);
            return Ok(updatedItem);  // Return the updated item instead of NoContent
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteToDoItem(int id)
        {
            var existingItem = _toDoServices.GetToDoItemById(id);
            if (existingItem == null)
            {
                return NotFound();
            }
            _toDoServices.DeleteToDoItem(id);
            return NoContent();
        }
    }
}