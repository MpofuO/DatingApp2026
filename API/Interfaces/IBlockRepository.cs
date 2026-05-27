using System;
using API.Entities;

namespace API.Interfaces;

public interface IBlockRepository
{
    void AddBlock(MemberBlock block);
    void UpdateBlock(MemberBlock block);
    void DeleteBlock(MemberBlock block);
    Task<IReadOnlyList<MemberBlock>> GetMemberBlocksAsync(string memberId);
    Task<MemberBlock?> GetBlockAsync(string sourceMemberId, string targetMemberId);
}
