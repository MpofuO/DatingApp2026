import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Member, MemberBlock } from '../../../types/member';
import { BlockService } from '../../../core/services/block-service';
import { ToastService } from '../../../core/services/toast-service';
import { BlockModal } from '../block-modal/block-modal';

@Component({
  selector: 'app-member-blocked',
  imports: [BlockModal],
  templateUrl: './member-blocked.html',
  styleUrl: './member-blocked.css',
})
export class MemberBlocked implements OnInit {
  @ViewChild('blockModal') blockModal!: BlockModal;
  private blockService = inject(BlockService);
  private toastService = inject(ToastService);
  protected blocks = signal<MemberBlock[]>([]);

  ngOnInit() {
    this.blockService.getBlocks().subscribe({
      next: blocks => {
        this.blocks.set(blocks);
      }
    });
  }

  unblockMember(event: Event, memberId: string) {
    event.stopPropagation();
    this.blockService.deleteBlock(memberId).subscribe({
      next: () => {
        const memberName = this.blocks().find(b => b.targetMemberId === memberId)?.targetMember.displayName;
        this.toastService.success(`${memberName} unblocked`);
        this.blocks.update(blocks => blocks.filter(b => b.targetMemberId !== memberId));
      }
    });
  }

  openModal(memberId: string) {
    const block = this.blocks().find(b => b.targetMemberId === memberId);
    if (block) {
      this.blockModal.memberBlock.set({ id: block.targetMemberId, reason: block.reason });
      this.blockModal.open();
    }
  }

  updateBlock(event: { id: string, reason: string }) {
    this.blockService.updateBlock(event.id, event.reason).subscribe({
      next: () => {
        this.blocks.update(blocks => blocks.map(b => b.targetMemberId === event.id ? { ...b, reason: event.reason } : b));
        this.toastService.success('Block reason updated');
      },
      error: error => {
        this.toastService.error(error);
      }
    });
  }
}
