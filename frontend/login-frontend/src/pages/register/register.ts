import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/core/services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private route = inject(Router);

    errorMessage : string | null = null;
    isLoading = false;

    registerForm: FormGroup = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    onSubmit(): void {
        if (this.registerForm.invalid){
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const {username,email,password} = this.registerForm.value;

        this.authService.register(username,email,password,false).subscribe({
            next:() => {
                this.isLoading = false;
                this.route.navigate(['/home']);
            },
            error:(err) => {
                this.isLoading = false;
                this.errorMessage = 'Error al registrar el usuario';
            }
        })
    }
}