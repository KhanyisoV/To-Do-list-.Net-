using Models;
using ToDoApp.Interfaces;
using System.Collections.Generic;
namespace ToDoApp.Services
{
    public class ToDoService : IToDoServices

    {
        private readonly List<ToDoItem> _toDoItems = new List<ToDoItem>();
        public void AddToDoItem(ToDoItem item)
        {
            _toDoItems.Add(item);
        }
        public ToDoItem? GetToDoItemById(int id)
        {
            return _toDoItems.FirstOrDefault(item => item.Id == id);
        }
        
        public void UpdateToDoItem(ToDoItem item)
        {
            string existingItemName = GetToDoItemById(item.Id)?.Name ?? "";
            if (existingItemName != item.Name)
            {
                GetToDoItemById(item.Id)?.UpdateName(item.Name);
            }
        }
        public void DeleteToDoItem(int itemId)
        {
            if (GetToDoItemById(itemId) == null)
            {
                throw new ArgumentException("Item not found");
            }
            _toDoItems.Remove(_toDoItems.FirstOrDefault(item => item.Id == itemId)!);
        }
        public IEnumerable<ToDoItem> GetAllToDoItems()
        {
            return _toDoItems;
        }

        public void ClearAll()
        {
            _toDoItems.Clear();
        }
        public void MarkAsCompleted(int id)
        {
            var item = GetToDoItemById(id);
            if (item == null)
            {
                throw new ArgumentException("Item not found");
            }
            item.MarkAsCompleted();
        }

    }

}