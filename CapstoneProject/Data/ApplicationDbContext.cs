﻿using System;
using System.Collections.Generic;
using System.Text;
using CapstoneProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace CapstoneProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupTraveller>()
                .HasKey(gt => new { gt.GroupId, gt.TravellerId });

            modelBuilder.Entity<GroupTraveller>()
                .HasOne(gt => gt.Group)
                .WithMany(g => g.GroupTravellers)
                .HasForeignKey(gt => gt.GroupId);

            modelBuilder.Entity<GroupTraveller>()
                .HasOne(gt => gt.Traveller)
                .WithMany(t => t.GroupTravellers)
                .HasForeignKey(gt => gt.TravellerId);
        }


        public DbSet<Traveller> Travellers { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupTraveller> GroupTravellers { get; set; }
        public DbSet<Journal> Journals { get; set; }
    }
}