import { Component } from '@angular/core';
import { LucideFolderCode ,  LucideBrain ,LucideBookOpenCheck ,LucideRectangleEllipsis} from '@lucide/angular';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [LucideFolderCode, LucideBrain, LucideBookOpenCheck, LucideRectangleEllipsis, RouterOutlet],
  selector: 'app-authpage',
  styleUrl: './authpage.css',
  templateUrl: './authpage.html',
})
export class Authpage {}