"use client";

import { use, useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;
    
    setActive({
      organization: params.OrganizationId as string,
    });
  }, [setActive, params.OrganizationId]);

  return null;
};
