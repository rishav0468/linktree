'USE SERVER';


import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import {Page} from "@/models/Page";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import cloneDeep from 'clone-deep';
import grabUsername from "@/actions/grabUsername";

export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  if (!session) {
    return redirect('/');
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });

if (!page) {
  // Handle the case where no matching page is found
  console.log("No matching page found for user:", session?.user?.email);
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}

// Convert page to lean object
const leanPage = cloneDeep(page.toJSON());
leanPage._id = leanPage._id.toString();

// Continue processing the leanPage object or return it
return (
  <>
    <PageSettingsForm page={leanPage} user={session.user} />
    <PageButtonsForm page={leanPage} user={session.user} />
    <PageLinksForm page={leanPage} user={session.user} />
  </>
);
}

  
  // const page = await Page.findOne({owner: session?.user?.email});
  
  // const leanPage = cloneDeep(page.toJSON());
  // leanPage._id = leanPage._id.toString();
  // if (page) {
  //   return (
  //     <>
  //       <PageSettingsForm page={leanPage} user={session.user} />
  //       <PageButtonsForm page={leanPage} user={session.user} />
  //       <PageLinksForm page={leanPage} user={session.user} />
  //     </>
  //   );
  // }

  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
