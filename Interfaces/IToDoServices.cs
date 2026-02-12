using Models;

namespace ToDoApp.Interfaces
{
    public interface IToDoServices
    {
        ToDoItem AddToDoItem(ToDoItem item);
        ToDoItem? GetToDoItemById(int id);
        IEnumerable<ToDoItem> GetAllToDoItems();
        ToDoItem? UpdateToDoItem(int id, ToDoItem item);
        void DeleteToDoItem(int id);
    }
}
