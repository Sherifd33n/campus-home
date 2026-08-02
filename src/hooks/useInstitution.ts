"use client";

import { useMemo } from "react";
import { Institution, State } from "@/types";
import { institutions } from "@/data/listing";
import { states } from "@/data/state";

interface UseInstitutionReturn {
  institutions: Institution[];
  states: State[];
  getInstitutionBySlug: (slug: string) => Institution | undefined;
  getInstitutionsByState: (stateId: string) => Institution[];
  getStateById: (stateId: string) => State | undefined;
}

export function useInstitution(): UseInstitutionReturn {
  const allInstitutions = useMemo(() => institutions, []);
  const allStates = useMemo(() => states, []);

  const getInstitutionBySlug = (slug: string) => {
    return allInstitutions.find((inst) => inst.schoolSlug.toLowerCase() === slug.toLowerCase());
  };

  const getInstitutionsByState = (stateId: string) => {
    return allInstitutions.filter((inst) => inst.stateId.toLowerCase() === stateId.toLowerCase());
  };

  const getStateById = (stateId: string) => {
    return allStates.find((s) => s.id.toLowerCase() === stateId.toLowerCase());
  };

  return {
    institutions: allInstitutions,
    states: allStates,
    getInstitutionBySlug,
    getInstitutionsByState,
    getStateById,
  };
}
