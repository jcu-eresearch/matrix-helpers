# Upgrade steps

* Review all current functionality and note any issues. Squiz has been known
  to break backwards compatibility  without notification and without mention
  in the changelogs.
* Review changelog for detailed changes; note any improvements or potential
  conflicts.
* Provide feedback to Digital Marketing and ensure there's no breakage of
  current sites.

## After upgrade

* Review list of
  [issues](https://github.com/jcu-eresearch/matrix-helpers/issues) and
  determine what, if anything, can be fixed or workarounds removed.
* Remove workarounds, one by one, and test to ensure that Squiz is correct in
  their implementation.

  For instance, `%frontend_asset%`, introduced in v5.4,
  is not actually the correct keyword, despite what Squiz said on their
  documentation.  This value was actually empty and the problem only resolved
  as a mistake in their documentation when we asked them.

  * Note any further conflicts, problems or inconsistencies and report
    accordingly.

* Apply improvements
* Update monkey patches and system integration for these areas:

  * Edit+ CSS: see `editplus/README.md` for upgrade info
  * Edit+ JS plugins

## Snippets

%frontend_asset_assetid^eq:{globals_site_assetid}:{globals_site_index_id}:{frontend_asset_assetid}%
