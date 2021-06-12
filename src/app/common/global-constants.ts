import { HttpHeaders } from "@angular/common/http";

export class GlobalConstants {

  // public static httpOptions = {
  //   headers: new HttpHeaders({
  //     'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMC4xLjEuMTAiLCJpYXQiOjIwMjAwMjExfQ==.hPJbm6YIZT+fL6Br20b2KVgbDiJwkeLTlzXz3nGo1TI='
  //   })
  // };

  public static servicesUrl: string = GlobalConstants.getUrlPath();
  
  private static getUrlPath(): string {
    const url = new URL(window.location.origin);
    url.port = '';
    if (url.toString() == 'http://webdesenv/' || url.toString() == 'http://10.2.1.2/') {
      return 'http://10.2.1.2/emerson/faculdade/plataformas-digitais/php/services/';
    }
    return 'http://localhost/github/angular/plataformas-digitais/php/services/';
  }
  
}
