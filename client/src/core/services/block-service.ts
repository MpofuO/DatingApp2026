import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member, MemberBlock } from '../../types/member';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getBlocks() {
    return this.http.get<MemberBlock[]>(this.baseUrl + 'blocks/');
  }

  blockUser(targetUserId: string, reason: string) {
    return this.http.post(this.baseUrl + 'blocks/' + targetUserId, { reason });
  }

  updateBlock(targetUserId: string, reason: string) {
    return this.http.put(this.baseUrl + 'blocks/' + targetUserId, { reason });
  }

  deleteBlock(targetUserId: string) {
    return this.http.delete(this.baseUrl + 'blocks/' + targetUserId);
  }
}
