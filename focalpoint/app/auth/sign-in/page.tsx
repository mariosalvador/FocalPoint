

export default function SignIn(){
  return(
    <h1>ola</h1>
  )
};





// "use client"
// import { FC } from 'react';

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { FcGoogle } from "react-icons/fc";

// // Defina o schema de validação usando Zod
// const formSchema = z.object({
//   email: z.string().email("Digite um e-mail válido."),
//   password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
// });

// const LoginPage: FC = () => {

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: ""
//     },
//   })

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     console.log(data); // Substitua pelo seu código de autenticação
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email"
//                       className="input border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-full"
//                       placeholder="Digite seu e-mail" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Senha</FormLabel>
//                   <FormControl>
//                     <Input type="password"
//                       className="input border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-full"
//                       placeholder="Digite sua senha" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
//               Entrar
//             </Button>


//             <div className="flex items-center justify-center my-4">
//               <hr className="w-1/4 border-gray-300" />
//               <span className="mx-2 text-gray-500">ou</span>
//               <hr className="w-1/4 border-gray-300" />
//             </div>

//             <Button
//               type="button"
//               className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
//               onClick={() => console.log("Login com Google")}
//             >
//               <FcGoogle className="mr-2 text-2xl" />
//               Entrar com Google
//             </Button>
//           </form>
//         </Form>

//       </div>
//     </div>
//   );
// };

// export default LoginPage;
