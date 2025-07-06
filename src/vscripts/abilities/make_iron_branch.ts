import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";

@registerAbility()
export class make_iron_branch extends BaseAbility {
    particle?: ParticleID;

    GetCooldown() {
        let cooldown = this.GetSpecialValueFor("cooldown");
        if (IsServer()) {
            const talent = this.GetCaster().FindAbilityByName("special_bonus_unique_meepo_3");
            if (talent) {
                cooldown -= talent.GetSpecialValueFor("value");
            }
        }

        return cooldown;
    }

    OnAbilityPhaseStart() {
        if (IsServer()) {
            this.GetCaster().EmitSound("Hero_Meepo.Earthbind.Cast");
        }

        return true;
    }

    OnAbilityPhaseInterrupted() {
        this.GetCaster().StopSound("Hero_Meepo.Earthbind.Cast");
    }
}
