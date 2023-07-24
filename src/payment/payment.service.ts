import { ForbiddenException, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/make-paymen.dto';
import axios from 'axios';

@Injectable()
export class PaymentService {
    async makePayment(makePaymentDto: MakePaymentDto){
        try{
            const {data} = await axios({
                method: 'POST',
                url:' https://api.yookassa.ru/v3/payments',
                headers: {
                    "Content-Type": "application/json",
                    "Idempotence-Key": Date.now(),
                
                },
                auth: {
                    username: '228622',
                    password:'test_q_9otCOqcMuQIG_n3wTR7-kaRCYh6MTXcBgzvORMa5Y'
                },
                data:{
                    amount: {
                        value: makePaymentDto.amount,
                        currency: "RUB"
                      },
                      capture: true,
                      confirmation:{
                        type: 'redirect',
                        return_url: 'http://localhost:3001/order'
                      },
                      description: 'Заказ №1'
                }
            });
      return data;
    }catch(error){
        throw new ForbiddenException(error);

    }
    }
}