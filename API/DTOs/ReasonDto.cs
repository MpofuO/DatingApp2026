using System;
using System.ComponentModel.DataAnnotations;
using CloudinaryDotNet.Actions;

namespace API.DTOs;

public class ReasonDto
{
    [StringLength(200, ErrorMessage = "Reason cannot exceed 200 characters")]
    [Required(ErrorMessage = "Reason is required")]
    public required string Reason { get; set; }
}
