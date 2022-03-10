import { HttpModule } from '@nestjs/axios';
import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpConfigService } from './commons/serviceCaller/httpConfig';
import { ServiceCaller } from './commons/serviceCaller/service-caller';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';


@Module({
  imports: [
    // HttpModule.register({timeout: 5000,maxRedirects: 5,})
    HttpModule.registerAsync({useClass: HttpConfigService})
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService,ServiceCaller],
})
export class AppModule {

}
