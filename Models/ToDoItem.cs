using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ToDoItem
    {
        [Key]
        public int Id { get; private set; }
    
        public string Name { get; set; } = null!;
        
        public bool IsCompleted { get; set; }
        public string Description { get; set; } = null!;
        public DateTime DateCompleted { get; protected set; }
        public  DateTime DateCreated { get; private set; } = DateTime.Now;

        public void MarkAsCompleted()
        {
            IsCompleted = true;
            DateCompleted = DateTime.Now;
        }
        public void UpdateName(string newName)
        {
            
            if(newName == null || newName.Trim() == "")
            {
                throw new ArgumentNullException(nameof(newName), "Name cannot be null.");
            }
            else
            {
                Name = newName;
            }
        }
    
        public void UpdateDescription(string newDescription)
        { 

            if (newDescription == null || newDescription.Trim() == "")
            
                throw new ArgumentNullException(nameof(newDescription), "Description cannot be null.");
            
            if(newDescription.Length > 500)
            
                
            throw new ArgumentException("Description too long");
            
            
            Description = newDescription;
         

        }

    }
}