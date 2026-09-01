import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpLoaderComponent } from './core/components/http-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
