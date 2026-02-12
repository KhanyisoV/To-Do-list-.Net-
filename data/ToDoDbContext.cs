using Microsoft.EntityFrameworkCore;
using Models;

namespace ToDoApp.data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options) { }

        public DbSet<ToDoItem> ToDoItems { get; set; } = null!;
    }
}
