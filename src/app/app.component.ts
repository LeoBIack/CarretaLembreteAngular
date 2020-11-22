import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "./_services/token-storage.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { LembreteInserirComponent } from './lembretes/lembrete-inserir/lembrete-inserir.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      setTimeout(() => {
        this.router.navigate(["/user"]);
      }, 4000);

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  addLive(): void {
    const dialogRef = this.dialog.open(LembreteInserirComponent, {
      // maxHeight: '95vh',
      minWidth: '400px',
      // width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // window.location.reload();
    });
  }

}
