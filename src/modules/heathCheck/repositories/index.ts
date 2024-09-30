//Tương tác dữ liệu với database bằng prisma
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/services';

// import { GetHeathCheckQuery } from "../implements";

// @QueryHandler(GetHeathCheckQuery)
@Injectable()
export class HeathCheckRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getConection() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.log(`🚀 ~ file: index.ts:16 ~ HeathCheckRepository ~ getConection ~ error:`, error)
      return false;
    }
  }
}
