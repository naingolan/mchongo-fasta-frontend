import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PolicySection {
  id: string;
  title: string;
}

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class PrivacyComponent {
  /** Keep in sync with the <section id> values in privacy.html. */
  protected readonly sections: PolicySection[] = [
    { id: 'who-we-are', title: 'Who we are' },
    { id: 'what-we-collect', title: 'What we collect' },
    { id: 'why-we-use-it', title: 'Why we use it' },
    { id: 'nida', title: 'National ID and verification' },
    { id: 'sharing', title: 'Who we share it with' },
    { id: 'payments', title: 'Payments' },
    { id: 'retention', title: 'How long we keep it' },
    { id: 'security', title: 'How we protect it' },
    { id: 'rights', title: 'Your rights' },
    { id: 'deletion', title: 'Deleting your account and data' },
    { id: 'transfers', title: 'Where your data is stored' },
    { id: 'children', title: 'Age limit' },
    { id: 'changes', title: 'Changes to this policy' },
    { id: 'contact', title: 'Contact us' },
  ];

  protected readonly effectiveDate = '8 September 2026';
  protected readonly contactEmail = 'kelvinsdechaw@gmail.com';
}
