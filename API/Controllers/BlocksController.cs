using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Policy = "RequireVIPRole")]
public class BlocksController(IUnitOfWork uow) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MemberBlock>>> GetBlocks()
    {
        string currentUserId = User.GetMemberId();
        var blockedMembers = await uow.BlockRepository.GetMemberBlocksAsync(currentUserId);
        return Ok(blockedMembers);
    }

    [HttpPost("{id}")]
    public async Task<ActionResult> AddBlock([FromRoute] string id, [FromBody] ReasonDto dto)
    {
        if(string.IsNullOrWhiteSpace(dto.Reason)) return BadRequest("Reason for block is required");
        string currentUserId = User.GetMemberId();
        if (currentUserId == id) return BadRequest("You cannot block yourself");

        var targetMember = await uow.MemberRepository.GetMemberByIdAsync(id);
        if (targetMember == null) return NotFound("Target member not found");

        uow.BlockRepository.AddBlock(new MemberBlock
        {
            SourceMemberId = currentUserId,
            TargetMemberId = id,
            Reason = dto.Reason
        });
        if (await uow.Complete()) return Ok();
        return BadRequest("Failed to block member");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateBlock([FromRoute] string id, [FromBody] ReasonDto dto)
    {
        string currentUserId = User.GetMemberId();

        var targetMember = await uow.MemberRepository.GetMemberByIdAsync(id);
        if (targetMember == null) return NotFound("Target member not found");

        var block = await uow.BlockRepository.GetBlockAsync(currentUserId, id);
        if (block == null) return NotFound("Block not found");

        block.Reason = dto.Reason;
        uow.BlockRepository.UpdateBlock(block);
        if (await uow.Complete()) return Ok();
        return BadRequest("Failed to update block");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBlock([FromRoute] string id)
    {
        string currentUserId = User.GetMemberId();

        var targetMember = await uow.MemberRepository.GetMemberByIdAsync(id);
        if (targetMember == null) return NotFound("Target member not found");

        var block = await uow.BlockRepository.GetBlockAsync(currentUserId, id);
        if (block == null) return NotFound("Block not found");

        uow.BlockRepository.DeleteBlock(block);
        if (await uow.Complete()) return Ok();
        return BadRequest("Failed to unblock member");
    }
}
