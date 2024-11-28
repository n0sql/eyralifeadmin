import ChangePassword from "@/components/UsersTable/ChangePassword";

export default async function ChangePasswordPage(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }){
    return(
        <ChangePassword/>
    )
}