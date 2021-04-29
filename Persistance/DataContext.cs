using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //* This definitions is going to model a SQL table fields after the properties of the Activity class
        public DbSet<Activity> Activities { get; set; }
    }
}