import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RouteModule } from './route/route.module';

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormularioBaseComponent } from "./components/formularioBase/formularioBase.component";
import { MultiProbabilidadComponent } from "./components/multi-probabilidad/multi-probabilidad.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    FormularioBaseComponent,
    MultiProbabilidadComponent
  ],
  imports: [BrowserModule, FormsModule,RouteModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
