using ToDoApp.Services;
using ToDoApp.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSingleton<IToDoServices, ToDoService>();
builder.Services.AddControllers();

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// Configure middleware
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
