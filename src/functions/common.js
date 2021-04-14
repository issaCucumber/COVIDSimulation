function is_infected(infected, candidate, vaccine_success, mask_success) {
    var prop = 1;

    if(infected.state.quarantined || infected.state.immuned || candidate.state.immuned) {
        return false;
    }
    
    if(candidate.state.vaccinated) {
        prop = (100 - vaccine_success) / 100;
    }

    if(candidate.state.masked) {
        prop *= (100 - mask_success) / 100;
    }

    if(infected.state.masked) {
        prop *= (100 - mask_success) / 100;
    }

    if(prop == 1) {
        return true;
    }

    var y = Math.random();
    return y < prop;
}

function is_quarantined(candidate, t, incubation_period) {
    if(!candidate.state.immuned && candidate.state.infected && (t - candidate.state.infected_t) >= incubation_period) {
        return true;
    }

    return false;
}

function is_recovered(candidate, t, recovery_period) {
    if(candidate.state.quarantined && (t - candidate.state.quarantine_t) >= recovery_period) { // assume immunity after recovery
        return true;
    }

    return false;
}

export { is_infected, is_quarantined, is_recovered };