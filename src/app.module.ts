import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { LinksController } from './links/links.controller';

@Module({
  imports: [LinksModule],
  controllers: [LinksController, AppController],
  providers: [AppService]
})
export class AppModule {}
