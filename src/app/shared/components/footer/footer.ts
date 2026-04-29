import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFacebook, lucideInstagram, lucideTwitter, lucideYoutube, lucideMail, lucidePhone, lucideMapPin } from '@ng-icons/lucide';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, NgIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideFacebook, lucideInstagram, lucideTwitter, lucideYoutube, lucideMail, lucidePhone, lucideMapPin })]
})
export class Footer {}
