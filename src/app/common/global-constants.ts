export class GlobalConstants {

  public static loadingConfig = {
    fullScreenBackdrop: true
  };

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
