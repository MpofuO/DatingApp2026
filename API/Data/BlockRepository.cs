using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class BlockRepository(AppDbContext context) : IBlockRepository
{
    public void AddBlock(MemberBlock block)
    {
        context.Blocks.Add(block);
    }

    public void DeleteBlock(MemberBlock block)
    {
        context.Blocks.Remove(block);
    }

    public async Task<MemberBlock?> GetBlockAsync(string sourceMemberId, string targetMemberId)
    {
        return await context.Blocks.FindAsync(sourceMemberId, targetMemberId);
    }

    public async Task<IReadOnlyList<MemberBlock>> GetMemberBlocksAsync(string memberId)
    {
        return await context.Blocks
            .Include(x => x.TargetMember)
            .Where(x => x.SourceMemberId == memberId)
            .ToListAsync();
    }

    public void UpdateBlock(MemberBlock block)
    {
        context.Blocks.Update(block);
    }
}
