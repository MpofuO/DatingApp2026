using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class MemberBlock
{
    public required string SourceMemberId { get; set; }
    public Member SourceMember { get; set; } = null!;
    public required string TargetMemberId { get; set; }
    public Member TargetMember { get; set; } = null!;

    [StringLength(200, ErrorMessage = "Reason cannot be longer than 200 characters.")]
    public required string Reason { get; set; }
}
