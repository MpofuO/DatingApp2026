namespace API.Interfaces;

public interface IUnitOfWork
{
    IMemberRepository MemberRepository { get; }
    IMessageRepository MessageRepository { get; }
    ILikesRepository LikesRepository { get; }
    IPhotoRepository PhotoRepository { get; }
    IBlockRepository BlockRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}