import { RxSchema } from "rxdb"
import $RefParser from "@apidevtools/json-schema-ref-parser"

/**
 * Takes the path to the scrapsCollection file and parses it stripping out references and flattening the
 * scrapsCollection ready to be consumed as an RxSchema
 *
 * @param schemaFile Path to the Schema file
 */
export const hydrateSchema = async (schemaFile: string): Promise<{ schema: RxSchema }> => ({
  schema: (await $RefParser.dereference(schemaFile)) as RxSchema,
})
