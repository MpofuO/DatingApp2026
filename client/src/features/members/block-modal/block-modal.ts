import { Component, ElementRef, input, model, output, ViewChild } from '@angular/core';
import { MemberBlock } from '../../../types/member';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-block-modal',
  imports: [FormsModule],
  templateUrl: './block-modal.html',
  styleUrl: './block-modal.css',
})
export class BlockModal {
@ViewChild('blockModal') modalRef!: ElementRef<HTMLDialogElement>;
submitData = output<{id:string, reason:string}>();
  mode = input<string>('Add');
  memberBlock = model({ id: '', reason: '' } as { id: string, reason: string });

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

  submit() {
    this.submitData.emit(this.memberBlock());
    this.close();
  }
}
