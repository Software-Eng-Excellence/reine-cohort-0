import { JSONPetMapper } from "../../src/mappers/Pet.mapper";
import { Pet } from "../../src/model/Pet.model";
import { mockPetOrdersData } from "../mocks/mockData";

describe('JSONPetMapper', () => {
    let mapper: JSONPetMapper;

    beforeAll(() => {
        mapper = new JSONPetMapper();
    });

    it('should correctly map a valid JSON object to a Pet object', () => {
        const petData = JSON.parse(mockPetOrdersData)[0];

        const pet = mapper.map(petData);

        expect(pet).toBeInstanceOf(Pet);
        expect(pet.getProductType()).toBe(petData["Product Type"]);
        expect(pet.getPetType()).toBe(petData["Pet Type"]);
        expect(pet.getBrand()).toBe(petData["Brand"]);
        expect(pet.getSize()).toBe(petData["Size"]);
        expect(pet.getFlavor()).toBe(petData["Flavor"]);
        expect(pet.getEcoFriendly()).toBe(petData["Eco-Friendly"] === "Yes");
    });

    it('should throw an error if any required field is missing', () => {
        const petData = { ...JSON.parse(mockPetOrdersData)[0] };
        delete petData["Product Type"]; //remove a required field

        expect(() => mapper.map(petData)).toThrow('Missing required property');
    });

    it('should throw an error for an empty input object', () => {
        expect(() => mapper.map({})).toThrow();
    });
});
