using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ToDoApp.data;
using ToDoApp.Interfaces;
using ToDoApp.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ToDoDbContext>(options => options.UseSqlite("Data Source=todo.db"));

// Add services to the container
builder.Services.AddScoped<IToDoServices, ToDoService>();

// REMOVE THE DUPLICATE - Keep only this one with JSON options:
builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReactApp",
        policy =>
            policy
                .WithOrigins(
                    "http://localhost:3000",
                    "https://lively-meadow-0d1160203.1.azurestaticapps.net"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
    );
});

var app = builder.Build();

// Configure middleware
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
