

import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrgnizationPage () {
    return (
    <OrganizationList
    hidePersonal
    afterSelectOrganizationUrl="/orgnization/:id"
    afterCreateOrganizationUrl="/orgnization/:id"
    
    />
  );
}