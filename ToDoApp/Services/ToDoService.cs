using Models;
using ToDoApp.Interfaces;
using System.Collections.Generic;
namespace ToDoApp.Services
{
    public class ToDoService : IToDoServices

    {
        private readonly List<ToDoItem> _toDoItems = new List<ToDoItem>();
        private int _nextId = 1;
         public ToDoItem AddToDoItem(ToDoItem item) 
        {
           
            var idProperty = typeof(ToDoItem).GetProperty("Id");
            idProperty?.SetValue(item, _nextId++);
            
            _toDoItems.Add(item);
            return item;
        }
        public ToDoItem? GetToDoItemById(int id)
        {
            return _toDoItems.FirstOrDefault(item => item.Id == id);
        }
        
        public void UpdateToDoItem(ToDoItem item)
        {var existingItem = GetToDoItemById(item.Id);
            if (existingItem == null) return;

            if (existingItem.Name != item.Name)
            {
                existingItem.UpdateName(item.Name);
            }    
            if (existingItem.IsCompleted != item.IsCompleted)
            {
                if (item.IsCompleted)
                {
                    existingItem.MarkAsCompleted();
                }
                else
                {
                    // Use reflection to reset IsCompleted
                    var isCompletedProperty = typeof(ToDoItem).GetProperty("IsCompleted");
                    isCompletedProperty?.SetValue(existingItem, false);
                }
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