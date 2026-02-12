using System.Collections.Generic;
using Models;
using ToDoApp.data;
using ToDoApp.Interfaces;

namespace ToDoApp.Services
{
    public class ToDoService : IToDoServices
    {
        private readonly ToDoDbContext _context; // ← Database connection instead of List

        // ← Constructor receives the database context
        public ToDoService(ToDoDbContext context)
        {
            _context = context;
        }

        public ToDoItem AddToDoItem(ToDoItem item)
        {
            // No need to manually set ID - database does it automatically!
            _context.ToDoItems.Add(item); // Add to database
            _context.SaveChanges(); // Save changes permanently
            return item; // Item now has ID set by database
        }

        public ToDoItem? GetToDoItemById(int id)
        {
            return _context.ToDoItems.FirstOrDefault(item => item.Id == id);
        }

        public ToDoItem? UpdateToDoItem(int id, ToDoItem item)
        {
            var existingItem = GetToDoItemById(id);
            if (existingItem == null)
                return null;

            if (existingItem.Name != item.Name)
            {
                existingItem.UpdateName(item.Name);
            }

            if (existingItem.Description != item.Description)
            {
                existingItem.UpdateDescription(item.Description);
            }

            if (existingItem.IsCompleted != item.IsCompleted)
            {
                if (item.IsCompleted)
                {
                    existingItem.MarkAsCompleted();
                }
                else
                {
                    var isCompletedProperty = typeof(ToDoItem).GetProperty("IsCompleted");
                    isCompletedProperty?.SetValue(existingItem, false);
                }
            }

            _context.SaveChanges();
            return existingItem;
        }

        public void DeleteToDoItem(int itemId)
        {
            var item = GetToDoItemById(itemId);
            if (item == null)
            {
                throw new ArgumentException("Item not found");
            }

            _context.ToDoItems.Remove(item); // Remove from database
            _context.SaveChanges(); // Save the deletion
        }

        public IEnumerable<ToDoItem> GetAllToDoItems()
        {
            // Get all items from database instead of the List
            return _context.ToDoItems.ToList();
        }

        public void ClearAll()
        {
            // Remove all items from database
            _context.ToDoItems.RemoveRange(_context.ToDoItems);
            _context.SaveChanges();
        }

        public void MarkAsCompleted(int id)
        {
            var item = GetToDoItemById(id);
            if (item == null)
            {
                throw new ArgumentException("Item not found");
            }
            item.MarkAsCompleted();
            _context.SaveChanges();
        }
    }
}
