using ImaPay.Data;
using ImaPay.Entity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace ImaPay
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "ImaPay",
                    Description = "Uma Web API ASP.NET Core para gerenciar usuários e transações do webapp Imã Pay."
                });
            });

            builder.Services.AddDbContext<SharnoContextDb>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("SharnoBank")));

            builder.Services.AddIdentity<Usuario, IdentityRole>(options => {
                options.User.RequireUniqueEmail = true;
            })  .AddEntityFrameworkStores<SharnoContextDb>()
                .AddDefaultTokenProviders();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}