import { RowDataPacket } from "mysql2";
export type LearnMoreFormResponse = { 
    name: string;
    email: string;
    phone: string;
    doctorType: string;
    website: string;
  };
  
export interface  SemaglutideOrder extends RowDataPacket {
    internal_id: string;
    agent_id: number;
    submission: Submission;
    status: string;
    created_at: string;
};
export interface Submission  {
    signature?: string;
    transaction_details: {
        itemPrice: string;
        discountPrice: number;
        couponId: string;
        itm_id: string;
        shippingAddress: string;
        shippingAddressNet: string;
        payment_type_id: string;
    };
    payment_info: {
        cc_number: string;
        cc_exp_month: string;
        cc_exp_year: string;
        cvc_code: string;
    };
    profile_info: {
        itm_id: string;
        payment_type: string;
        pharmacy_id: string;
        product_type_id: string;
        fname: string;
        lname: string;
        email: string;
        password: string;
        phone: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipcode: string;
        birthdate: string;
        height: string;
        feetHeight: string;
        inchesHeight: string;
        weight: string;
        gender: string;
        medication: string;
        medication_txt: string;
        medical_conditions_past_present: string;
        past_medical_conditions: string;
        taking_semaglutide_currently: string;
        switching_sublingual_tablets: string;
        diet_medication: string;
        diet_medication_yes_response: string;
        medication_allergies: string;
        list_medication_allergies: string;
        consume_alcohol: string;
        reason: string;
        test: string;
        medications_taken_to_treat: string;
        medullary_thyroid_cancer: string;
        multiple_endocrine_neoplasia: string;
        pancreatic_cancer: string;
        type_1_diabetes: string;
        other_health_prob: string;
        other_health_prob_yes_explain: string;
        pregnant: string;
}
}
export interface _Message  extends RowDataPacket {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// {
//   "agent_id": 1311,
//   "status": "failed",
//   "submission": {
//     "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACgCAYAAAC2eFFiAAAAAXNSR0IArs4c6QAADoVJREFUeF7tnXtoXFkdx8+dO5OkNT5gSWnTJPfemZqku2wWrd2qFEQEwccfqyCLi3/oPkRBdPGBf4kgiKAoCj6WxYUFF0EUFwSpov/V7orURRYhtpu5dyZD+mQNJtsm6czcI6eblMlkkrnPmXtmPvmzPY/f+fx+8+Wc3z0PQ/AHAQhAQBMChiZ2YiYEIAABgWARBBCAgDYEECxtXIWhEIAAgkUMQAAC2hBAsLRxFYZCAAIIFjEAAQhoQwDB0sZVGAoBCCBYxAAEIKANAQRLG1dhKAQggGARAxCAgDYEECxtXIWhEIAAgkUMQAAC2hBAsLRxFYZCAAIIFjEAAQhoQwDB0sZVGAoBCCBYxAAEIKANAQRLG1dhKAQggGARAxCAgDYEECxtXIWhEIAAgkUMQAAC2hBAsLRxFYZCAAIIFjEAAQhoQwDB0sZVGAoBCCBYxAAEIKANAQRLG1dhKAQggGARAxCAgDYEECxtXIWhEIAAgkUMQAAC2hBAsLRxFYZCAAIIFjEAAQhoQwDB0sZVGAoBCCBYxAAEIKANAQRLG1dhKAQggGARAxCAgDYEECxtXIWhEIAAgkUMQAAC2hBAsLRxFYZCAAIIFjEAAQhoQwDB0sZVGAoBCCBYxAAEIKANAQRLG1dhKAQggGARAxCAgDYEECxtXIWhEIAAgkUMQAAC2hBAsLRxFYZCAAIIFjEAAQhoQwDB0sZVGAoBCCBYxAAEIKANAQRLG1dhKAQggGARAxCAgDYEECxtXIWhEIAAgtUlBhzHke1FPM+DG78dCPSBAD+8LtCLxeIewXJdF259CFa6hAA/vJCCJaUUzLD44UCgPwQQrO6C5QshdnFihtWfYKVXCCBY3XNYvmEYCBa/FQhkgACC1cUJU1NTr4yMjLyrtZjrunNCiMsZ8B8mQGCoCCBYAdzdIfHedF03H6AqRSAAgQQJIFgBYLYLlu/7slKp5AJUpQgEIJAgAQQrAMx2weJLYQBoFIFACgQQrABQHcch8R6AE0UgkDYBBCsAYcdxmoZh7FoCsrUhADiKQCBhAghWAKCnT5/+zOuvv/6r1qLr6+s/uXnz5tMBqlMEAhBIiEAswbJt+97MwzCMhhDCrNfrz9dqtccTsi8zzXT4Uui7rmtmxkAMgcAQEIglWOpgcNueylZk6gzebdd13yqE2HMeTze2fCnUzWPYO4gE0hSse7zUVzXDMKTOs69isbjriA5fCgfx58CYsk4glmB1uskg4IB3Zl+TQoi1gHX6WowvhX3FT+cQuEsglmDZtt0wDONeHueA5eGBuKWUcnNz81tXr179blb94jjOrrEqO/lSmFVvYdegEoglWJ2glEqlp3zff0ZtA9heCoZlJzc2NjIpXu0zynq97tVqtWLYAVIeAhCIRiBxwWo3w3GcK4ZhHA07m1Nip5L1WZp5dVgCS9d1OaITLfaoBYHQBFIXrFaLos6+siJeHb6KIlihQ44KEIhOoKeC1W6mbdvXc7nchJRqd0QwU/opXiTeowcaNSGQBIFgKpFET13aKJVK16SUR8IuHdWysVc5r2KxeHdzbOtQSLz3IDjoAgLbBDIjWG1Lx8yKV4fE++1arfYWIgoCEEifQCYFK8vi1eGqGel5Hon39GOVHiAQbx9Wr/lFWTZub63wfd9vFAqFZ1577bWvxLGbHe9x6FEXAvEIZH6Gtd/woohXa1s7x4WazaZfKBTOLy0tfTAIynbBUnXIYwUhRxkIxCegrWC1Dt2yrJumad4X5mtjF3Sy2WyKfD7vlcvlUmvZ2dnZXzcajU+3/luj0fj28vLyd+K7gxYgAIGDCAyEYHUSrwhfG7tGijpCpGZmuVxuFzcppe95HlfNdCVIAQjEIzBwgtWKY2Zm5mI+n3/39vLPiHhUKChhNSvbqFarfDEMSoxyEAhJYKAFaz8Wtm1XDcOYVv+vdqymJWR3p2Nv9vEP13XfG9I3FIcABNoIDKVg7RcFjuO8bBjGw9u5sLTYyEaj8Z/l5eX7iUYIQCAcgbR+lOGsyHjpUqn0jBDiCd/3VZ4q8DGigMNSS8n1arX69oDlKQaBoSWAYEV0fafLC5NYWm4vIzc8zyMXFtE3VBtcAghWRN9220A6MzOzms/n1awpMuOWvWJb1Wr1UERTqQaBgSEQ+cc0MAQiDiTsBlLLslZM0zwWR8CUqdszsLrneSfVntWI5lMNAloSQLAium12dvbFRqPxSGv1MBtIi8Xi36WUD8fJie1ctWMYhj83N/eBc+fOXYg4HKpBQAsCCFYMN7Vf6BdnA+n8/PxfNjc3P9S+KTWCeSqJLycmJh69ePHi7yLUpwoEMksAwYrhmjRvbigWiy/4vv9YXAHbmYUVCoUvXb58+ecxhktVCPSdAIIVwwXdEu8xmt5T9eTJkz/a3Nx8Ou4ScvtmVzk6OvrjxcXFryZpI21BIG0CCFYMwpZlNU3T3HUXVq9ubnAc5+tSyu+rTWFBr5feb6i+78t8Pv/80tLS4zFwUBUCqRNAsGIgPnv27CeuXLny+9YmDMN4sVwufzJGs5GqPvjgg59dW1t7zjRN5dPIft1ZQjabzXPLy8sfi2QMlSCQEoHIgZ2SPdo1m+Wnv9Tjr0KIXJwp2I6A3bp164c3btz4hnYOwuCBIoBgxXRnlgWrfWiO49yRUubDJPI77N5XTxz9tlwuPxoTHdUhEJoAghUa2e4K7U9/qR+453lacC2VSlu+7xd2lpBhc2FqE+vIyMhLly5dOhsTI9UhEIiAFj+sQCPpU6FisdhUy67W7nuVeE96yCdOnFhrNpvjEb9Eynq9vlSr1WaTtov2ILBDAMGKGQunTp0qrK6u3mltpl+J95hD2VO9WCzeEkKoM4xh40RtXr1RrVaPJm0T7Q03gbCBONy09hl9mhtIswLccZwVKeWxCNsoZC6Xu720tKRmbvxBIBYBBCsWvjcr65R4T2C4wrbtfwsh7o8gXuoysXq5XB5Jwg7aGD4CCFYCPm9PvKsmdc1jhcUxNzf3t62trfdHES8hhO+67oQQ4r9h+6X8cBJAsBLwu+M4TcMwBiLxHgdHqVT6TbPZ/FRE8ZKu654WQvwzjg3UHWwCCFYC/n3ggQee3djYeKq1qUFJvEfFc+TIkR8cPnz4a1HF69ixY49cuHDhD1H7p95gEkCwEvLrMCTeo6JaWFh4cm1t7dmo4jU+Pv75V1999ZdR+6fe4BBAsBLy5bAl3uNgsyzLV2ceo9yBv31USCXv1RJy1zI8jk3U1YMAgpWQn8JemZxQt7o3c8KyrEs5dVbICB2KCJbu3o9gf+goidDHUFSZnp7eKBQKY62DHZYvhXEcPDEx8dz4+Pjnwh7QVseCPM9jhhUHvoZ1EawEncaysDvMycnJy2NjYyci7J5vb5wZVnfcA1cCwUrQpZ3eKmSWJdRG03fkcjm11yp2vJHDSjBgNWwqdgBpOObUTCaPtRutbdtNlZ+KClyJk3rYQwjxfKVSeSJqO9QbHAIIVoK+tCzrJdM039fapJTyj57nfTzBbjLdlG3bjVwuZ0Yx0vd9v16veysrK2rJyB8E9hBAsBIOimHcjzU5Obk4NjY2F3LJJxuNxuby8vLhhF1AcwNMAMFK2Lkd3irU5kK/MCgWFha++MYbb/wspEgJNYuqVCqRZmBh7KPsYBJAsBL2q23bfusVxDrdQBoAxX22bd8Im5dSD7tWq9V5IcTlAH1QBAL7EkCwEg6Ohx566Avr6+u/aG222WxuVavVXXu0Eu421eYi5qXk7du3X7l27dp7UjWOxoeKAIKVgrsHIY91/PjxyujoqBUSj7om+U6tVtNWnEOOl+I9JoBgpQBc5+0NxWJRPQ0WKsekth54nheqTgrYaXIICCBYKThZt/ux5ufn79va2roZ9HjMzluFhmF82HXdv6aAkCYh0JEAgpVSYOiwLJyZmVnP5/Nh7lqXGxsb1atXrzopYaNZCBxIAMFKKUCyfEyn09NkB2GQUjY8z1PvF/IHgb4SQLBSwp+1PNbMzMwL+Xz+saD7ptRtCHfu3PnTysrKR1NCRLMQCE0AwQqNLFgF27a3crncrtdhpJTrnue9LVgLyZSanp6uFwqFfIjW1MMQJNBDAKNo7wggWCmy7ud1M51meAcMlWMyKcYBTSdHAMFKjuWelnqdxzp69OilQ4cOvTPo1z4hhDx+/PiXz58//9MUMdA0BBIjgGAlhnJvQ52uVxkdHX1ycXHxuSS7Dbt3in1TSdKnrV4SQLBSpp3WsvDMmTML169f/1frucWDhrKdRL+ysrIylfKQaR4CqRFAsFJD+2bDnZaF29eqHIrSteM4m4ZhqGR+UN9xlXAU0NTJJIGgQZ9J43UwqtMz9mFvcJiamvpePp//ZtDZlOLi+36zUqmE+TqoA05sHHICCFYPAqCTaKmEd7d39SzLapqmGeaKYbm6uvrn1dXVj/RgWHQBgZ4TQLB6hLzT0tD3fVmpVHYJkmVZDdM0A++D2jnXx5NXPXIk3fSVAILVI/yWZf3PNM19N41GeAWZq1x65Du6yQ4BBKuHvmi/jTRi1+xEjwiOavoTQLB67MN98ln7WrH91NWepWOPzaY7CGSCAILVBzeomZbqVu1IN4x9XaCWfLVarRb21s8+jIguIdAbAghWbzh37KX1hZ2dHJZhGI1yucxVLn30C11nlwCClV3fYBkEINBGAMEiJCAAAW0IIFjauApDIQABBIsYgAAEtCGAYGnjKgyFAAQQLGIAAhDQhgCCpY2rMBQCEECwiAEIQEAbAgiWNq7CUAhAAMEiBiAAAW0IIFjauApDIQABBIsYgAAEtCGAYGnjKgyFAAQQLGIAAhDQhgCCpY2rMBQCEECwiAEIQEAbAgiWNq7CUAhAAMEiBiAAAW0IIFjauApDIQABBIsYgAAEtCGAYGnjKgyFAAQQLGIAAhDQhgCCpY2rMBQCEECwiAEIQEAbAgiWNq7CUAhA4P8q+JvdHLopGwAAAABJRU5ErkJggg==",
//     "transaction_details": {
//       "itemPrice": "295.00",
//       "discountPrice": 0,
//       "couponId": null,
//       "itm_id": "a1107cb88f05685ef0a71c240b9060cd1730928544",
//       "shippingAddress": "Miami Beach, 33139, US",
//       "shippingAddressNet": "1819 West Ave Bay 6, Miami Beach, FL 33139, United States",
//       "payment_type_id": "2"
//     },
//     "payment_info": {
//       "cc_number": "4444444444444444",
//       "cc_exp_month": "02",
//       "cc_exp_year": "2026",
//       "cvc_code": "874"
//     },
//     "profile_info": {
//       "itm_id": "a1107cb88f05685ef0a71c240b9060cd1730928544",
//       "payment_type": "authorize",
//       "pharmacy_id": "1",
//       "product_type_id": "1",
//       "fname": "Docmakori",
//       "lname": "Makoris",
//       "email": "nasirtech97@gmail.com",
//       "password": "sssssssssssssssssssssss",
//       "phone": "(954) 713-5418",
//       "address1": "1819 West Ave Bay 6, Miami Beach, FL 33139, United States",
//       "address2": "",
//       "city": "Miami Beach",
//       "state": "AK",
//       "zipcode": "33139",
//       "birthdate": "04/02/1991",
//       "height": "5' 5\"",
//       "feetHeight": "5",
//       "inchesHeight": "5",
//       "weight": "800",
//       "gender": "Male",
//       "medication": "No",
//       "medication_txt": "",
//       "medical_conditions_past_present": "No",
//       "past_medical_conditions": "",
//       "taking_semaglutide_currently": "No",
//       "switching_sublingual_tablets": "No",
//       "diet_medication": "No",
//       "diet_medication_yes_response": "",
//       "medication_allergies": "No",
//       "list_medication_allergies": "",
//       "consume_alcohol": "Never",
//       "reason": "control and management at this time? ",
//       "test[]": "NONE OF THE ABOVE",
//       "medications_taken_to_treat": "",
//       "medullary_thyroid_cancer": "No",
//       "multiple_endocrine_neoplasia": "No",
//       "pancreatic_cancer": "No",
//       "type_1_diabetes": "No",
//       "other_health_prob": "No",
//       "other_health_prob_yes_explain": "",
//       "pregnant": "No"
//     }
//   },
//   "internal_id": "28cce86d-2728-4219-befa-035633f385b5"
// }