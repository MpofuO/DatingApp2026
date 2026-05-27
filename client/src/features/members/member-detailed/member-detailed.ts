import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { PresenceService } from '../../../core/services/presence-service';
import { LikesService } from '../../../core/services/likes-service';
import { BlockService } from '../../../core/services/block-service';
import { ToastService } from '../../../core/services/toast-service';
import { HasRole } from "../../../shared/directives/has-role";
import { BlockModal } from '../block-modal/block-modal';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe, HasRole, BlockModal],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  @ViewChild('blockModal') blockModal!: BlockModal;
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  private accountService = inject(AccountService);
  protected presenceService = inject(PresenceService);
  protected likesService = inject(LikesService);
  protected blockService = inject(BlockService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');
  private routeId = signal<string | null>(null);
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.routeId();
  });
  protected hasLiked = computed(() => this.likesService.likeIds().includes(this.routeId()!));
  

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.routeId.set(params.get('id'));
    })
  }

  ngOnInit(): void {
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    })
  }

  blockMember(event: { id: string, reason: string }) {
    this.blockService.blockUser(event.id, event.reason).subscribe({
      next: () => {
        this.toastService.warning(`${this.memberService.member()?.displayName} blocked`);
        this.router.navigateByUrl('/members');
      },
      error: error => {
        this.toastService.error(error);
      }
    });
  }
}