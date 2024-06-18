import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string = '';
  isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {

    // Verificar el estado de autenticación al cargar el componente
    // this.authService.checkAuthentication().subscribe(
    //   isAuthenticated => {
    //     this.authService.setIsAuthenticated(isAuthenticated);
    //   }
    // );
  }

  

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
