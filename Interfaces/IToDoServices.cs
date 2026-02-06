using Models;
namespace ToDoApp.Interfaces
{   

public interface IToDoServices
{
    ToDoItem AddToDoItem(ToDoItem item);
    ToDoItem? GetToDoItemById(int id);
    IEnumerable<ToDoItem> GetAllToDoItems();
    void UpdateToDoItem(ToDoItem item);
    void DeleteToDoItem(int id);
}
}