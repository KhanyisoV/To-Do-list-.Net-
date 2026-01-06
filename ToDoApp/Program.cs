using ToDoApp.Services;
using ToDoApp.Interfaces;
using System.Text.Json; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSingleton<IToDoServices, ToDoService>();

// REMOVE THE DUPLICATE - Keep only this one with JSON options:
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

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