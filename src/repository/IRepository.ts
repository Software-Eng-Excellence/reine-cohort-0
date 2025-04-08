export type id = string;
export interface ID {
    getId(): id;
}

export interface Initializable {
    /**
    * init - initializes the creation of required tables and establishes a connection.
    * 
    * @throws InitializationException - if the initialization process fails.
    * Thrown if the initialization process fails.
    * 
    * @returns A promise that resolves when the initialization is complete.
    */

    init(): Promise<void>;
}

/**
 * Generic repository interface for managing items of type `T` that extends `ID`.
 * Provides methods for creating, retrieving, updating, and deleting items in the repository.
 *
 * @template T - The type of items managed by the repository, which must extend `ID`.
 */
export interface IRepository<T extends ID> {
    /**
     * Creates a new item in the repository.
     *
     * @param item - The item to be created in the repository.
     * @returns A promise that resolves to the unique identifier (`ID`) of the created item.
     * @throws {InvalidItemException} - Thrown when the provided item is invalid.
     */
    create(item: T): Promise<id>;

    /**
     * Retrieves an item from the repository by its ID.
     *
     * @param id - The ID of the item to retrieve.
     * @returns A promise that resolves to the item with the specified ID.
     * @throws {ItemNotFoundException} - Thrown when no item with the specified ID is found.
     */
    get(id: id): Promise<T>;

    /**
     * Retrieves all items from the repository.
     *
     * @returns A promise that resolves to an array of all items of type `T` in the repository.
     */
    getAll(): Promise<T[]>;

    /**
     * Updates an existing item in the repository.
     *
     * @param item - The item to update, which must include its unique identifier.
     * @returns A promise that resolves when the update operation is complete.
     * @throws {ItemNotFoundException} - Thrown when the item to update is not found in the repository.
     * @throws {InvalidItemException} - Thrown when the provided item is invalid.
     */
    update(item: T): Promise<void>;

    /**
     * Deletes an item from the repository by its unique identifier.
     *
     * @param id - The unique identifier of the item to delete.
     * @returns A promise that resolves when the delete operation is complete.
     * @throws {ItemNotFoundException} - Thrown when no item with the specified ID is found.
     */
    delete(id: id): Promise<void>;
}