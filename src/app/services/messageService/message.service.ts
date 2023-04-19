import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, from, of, tap } from 'rxjs';
import { API_URL } from '../constants';
import { CookieService } from 'ngx-cookie-service';
import axios, { AxiosRequestConfig } from 'axios';

export interface messagesType {
  id: Number;
  body: string;
  sent_at: string;
  phone_number: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messageSubject: Subject<any>;
  private messages: messagesType[] = [];
  private errorSubject: Subject<any>;
  private error: string = '';
  private user = this.cookieService.get('user');
  private auth = this.cookieService.get('auth');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth,
    }),
  };
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.messageSubject = new Subject<any>();
    this.errorSubject = new Subject<any>();

    this.loadMessages();
    console.log('came here again');
  }

  loadMessages() {
    const user = this.cookieService.get('user');
    const auth = this.cookieService.get('auth');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth,
      }),
    };
    return this.http
      .get<messagesType[]>(`${API_URL}/users/${user}/message`, httpOptions)
      .subscribe((messages) => {
        this.messages = messages;
        this.messageSubject.next(this.messages);
      });
  }

  getMessages() {
    return this.messageSubject.asObservable();
  }

  getErrors() {
    return this.errorSubject.asObservable();
  }

  sendMessage(message) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth,
    };

    const config: AxiosRequestConfig = {
      headers: headers,
    };

    const user = this.cookieService.get('user');
    const auth = this.cookieService.get('auth');
    const url = `${API_URL}/${user}/create_message`;
    return from(
      axios.post(url, { ...message, user_id: this.user }, config)
    ).subscribe(
      (res: any) => {
        console.log('Res', res.data);
        if (res.data.errors) {
          alert('Something went wrong, however we have saved your sms');
        }
        this.messages.push({ ...message, created_at: Date.now() });
        this.messageSubject.next(this.messages);
      },
      (error) => {
        this.error = 'Unexpected error occured, Please try after sometime';
        this.errorSubject.next(this.error);
        console.error(error);
      }
    );
  }

  getMessageSubject(): Subject<messagesType[]> {
    return this.messageSubject;
  }

  getErrorSubject(): Subject<string> {
    return this.errorSubject;
  }
}
