namespace API.DTOs;

public class PhotoForApprovalDto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public required string UserId { get; set; }
    public string? DisplayName {get; set;} = null!;
    public bool IsApproved { get; set; }
}