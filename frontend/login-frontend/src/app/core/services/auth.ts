import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  email: string;
  username: string;
}
export interface AuthResponse {
access: string;
refresh: string;
user: User;
}

export interface OtpResponse {
message: string;
email: string;
}
export interface MessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getInitialUser());
  public currentUser$ : Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}
  
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, { username, password });
  }
  register(username: string, email: string, password: string,rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, { username, email, password });
  }
  logout(): void {
    localStorage.clear();  
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
  private getStorage():Storage{
    const  rememberMe = JSON.parse(localStorage.getItem('rememberMe') || 'false');
    return rememberMe ? localStorage : sessionStorage;
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el token de refresco');
    }
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        this.setItem('accessToken', response.access);
      })
    );
  }
  public setSession(authRes: AuthResponse,rememberMe: boolean):void{
    localStorage.clear();
    sessionStorage.clear();

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('accessToken', authRes.access);
    storage.setItem('refreshToken', authRes.refresh);
    storage.setItem('currentUser', JSON.stringify(authRes.user));

    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    this.currentUserSubject.next(authRes.user);

  }
  private getInitialUser():User | null {
    const storage = this.getStorage();
    const userJson = storage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  
  }
  public getItem(key: string): string | null {
    return this.getStorage().getItem(key);
   
  }
  private setItem(key: string, value: string): void {
   this.getStorage().setItem(key, value);
  }
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/`);
  }
  requestOtp(email: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/password-reset/`, { email });
  }
  resetPassword(email: string, otp_code: string, new_password: string): Observable<MessageResponse> {
    const body = { email, otp_code, new_password };
    return this.http.post<MessageResponse>(`${this.apiUrl}/password-reset/confirm/`, body);
  }
}

